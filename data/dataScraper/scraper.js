const axios = require("axios") // Will allow for the api functionalities such as put, get, delete, post
const cheerio = require("cheerio") // used to scrap web page
const fs = require("fs")

const url = "https://www.wallstreetmojo.com/"

let pageLinks = ["3-fund-portfolio", "absolute-return", "accredited-investor", "active-investing", "active-management", "alpha-in-finance", "asset-allocation", "asset-allocation-fund", "asset-classes", "asset-management", "assets-under-management", "blind-trust", "bottom-fishing", "brownfield-investment", "capital-accumulation", "capital-loss", "cash-investment", "commingled-funds", "defined-benefit-plan", "direct-participation-program", "diversified-investments", "drawdown", "efficient-frontier", "endowment-fund", "equity-investment", "esg-investing", "etf-vs-index-funds", "ethical-investing", "excess-return", "factor-investing", "fund-manager", "green-investments", "greenfield-investment", "high-risk-investments", "hot-money", "impact-investing", "income-stock", "index-investing", "institutional-investors", "international-fund", "international-investments", "investing-in-currency", "investment-analysis", "investment-company", "investment-decision", "investment-income", "investment-manager", "investment-objective", "investment-policy-statement", "investment-property", "investment-risk", "investment-strategies", "investment-trust", "lump-sum-payment", "managed-account", "market-portfolio", "minimum-variance-portfolio", "modern-portfolio-theory", "money-manager", "named-beneficiary", "nominal-rate-of-return", "oil-investing", "omnibus-account", "passive-investing", "pension-fund", "pension-plan", "ponzi-scheme", "portfolio-analysis", "portfolio-diversification", "portfolio-investment", "portfolio-management", "portfolio-manager", "portfolio-optimization", "portfolio-rebalancing", "portfolio-turnover", "preservation-of-capital", "profit-sharing-plan", "profit-taking", "quant-funds", "quantamental", "reinsurance", "reinvestment", "retail-investors", "risk-and-return", "risk-averse", "risk-budgeting", "risk-neutral", "risk-tolerance", "risk-seeking", "sector-rotation", "socially-responsible-investing", "stop-loss-order", "strategic-asset-allocation", "systematic-investment-plan", "tontine", "trust-company", "trustee", "types-of-investments", "wealth-accumulation"]
let data = ""

const config = { 
	headers: { 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36", 
	}, 
};

for (let page = 0; page < pageLinks.length; page++){
    axios.get(url + `${pageLinks[page]}/`, config)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            //find the element with the class standard_table, then find the tr elements attached to it
            $('.entry-content').find('p').each(function (){
                //console.log($(this).text())
                data += ($(this).text() + "\n")

                if (page == pageLinks.length - 1) {
                    //console.log(data)

                    fs.writeFile('Output.txt', data, (err) => {
                        // In case of a error throw err.
                        if (err) throw err;
                    })
                }
            })
            
        }).catch((err) => console.log(err))
}