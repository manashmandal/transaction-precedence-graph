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

 // create an array with nodes
 var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
]);

// create an array with edges
var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
]);

// create a network
var container = document.getElementById('viz');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {};

// initialize your network!
var network = new vis.Network(container, data, options);