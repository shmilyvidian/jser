
const screenshot= async (page, path) => {
    await page.screenshot({path})
}

module.exports = {
    screenshot
}