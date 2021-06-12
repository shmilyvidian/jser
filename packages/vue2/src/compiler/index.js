import { generate } from './generate'
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/

export function compileToFunction(template){
    let ast = parseHTML(template)

    let code = generate(ast)
    let render = new Function(`with(this){return ${code}}`)
    console.log(code,'code',render);
    return render
}

function parseHTML(html){
    let stack = []
    let root = null
    function createASTElement(tag, attrs, parent){
        return {
            tag,
            type: 1,
            children: [],
            parent,
            attrs
        }
    }
    function start(tag, attrs){
        let parent = stack[stack.length - 1]
        let element = createASTElement(tag, attrs, parent)
        if(root === null){ //当前就是根节点
            root = element
        }
        if(parent){
            element.parent = parent
            parent.children.push(element)
        }
        stack.push(element)
    }
    function end(tagName){
        let endTag = stack.pop()
        if(endTag.tag != tagName) throw Error('error')
    }
    function text(chars){
        let parent = stack[stack.length - 1]
        chars = chars.replace(/\s/g,'')
        if(chars){
            parent.children.push({
                type:2,
                text: chars
            })
        }
    }
    function advance(len){
        html = html.substring(len)
    }
    function parserStartTag(){
       const start =  html.match(startTagOpen)
       if(start){
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length)
            let end;
            let attr;
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length)
                //去除结尾标签
            }
            // console.log(end,'end',end.length);
            if(end){
            console.log(html,'html');

                advance(end.length)
                console.log(html,'html');
            }
            return match
       }
       return  false
       
    }
    while(html){
        //解析标签和文本 <区分是标签还是文本
        let index = html.indexOf('<')
        if(index==0){
            //解析开始标签，并且把数学也解析出来
            const startTagMatch = parserStartTag()
            if(startTagMatch){
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }
            let endTagMatch;
            if(endTagMatch = html.match(endTag)){
                end(endTagMatch[1])
                advance(endTagMatch[0].length)
                continue
            }
            break
        }
        if(index > 0){
            let chars = html.substring(0, index)
            text(chars)
            advance(chars.length)
        }
    }
    return root
}