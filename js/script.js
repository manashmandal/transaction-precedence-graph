let expression;

const DEFAULT_EXPRESSION = "r1(x) r1(y) w2(x) w1(x) r2(y)"

$("#expressionInput").keyup((e)=>{
    expression = e.target.value;
    expressionParser(expression)
});

$("#defaultExpressionButton").on('click', ()=>{
    expression = DEFAULT_EXPRESSION;
    $("#expressionInput").val(DEFAULT_EXPRESSION);
})

console.log(Object.keys(_.groupBy([
    'T4', 'T2', 'T1', 'T3', 'T3'
])))

function clearAll(){
    $("#transactions").empty()
    $("#variables").empty()
}

function expressionParser(text){
    if (text !== undefined){
    
    clearAll(); 
        // Replace operations with transactions 
    let transactions = Object.keys(_.groupBy(text.replace(new RegExp('w|r', 'g'), 'T').replace(/\(.\w*\)/gi, '').split(' ')))

    let variables = Array.from(new Set(text.match(/\(.\w*\)/gi).map(v => v.replace('(', '').replace(')', ''))))
    
    // (new RegExp("(|)", 'g'), ''))
    console.log({'extracted' : variables})
    console.log(transactions)

    _.each(transactions, (T)=>{
        $("#transactions").append(
            `<span class="badge badge-primary">${T}</span>`
        )
    })

    _.each(variables, (V)=>{
        $("#variables").append(
            `<span class="badge badge-secondary">${V}</span>`
        )
    })

    }
    
}