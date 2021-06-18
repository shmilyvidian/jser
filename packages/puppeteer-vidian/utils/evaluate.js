const evaluate = async (ctx, fn = _ => _) => {
    await ctx.setContent("<script>...</script>")
    let result = await ctx.evaluate(()=>fn())
    return result
}

module.exports = {
    evaluate
}