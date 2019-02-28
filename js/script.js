let expression;

// Helper groupby function
Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
      const val = item[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
  }

const DEFAULT_EXPRESSION = "r1(x) r1(y) w2(x) w1(x) r2(y)"

$("#expressionInput").keyup((e)=>{
    expression = e.target.value;
    expressionParser(expression)
});

$("#defaultExpressionButton").on('click', ()=>{
    expression = DEFAULT_EXPRESSION;
    $("#expressionInput").val(DEFAULT_EXPRESSION);
})


function clearAll(){
    $("#transactions").empty()
    $("#variables").empty()
}

function expressionParser(text){
    if (text !== undefined){

    text = text.trim();
    
    clearAll(); 
        // Replace operations with transactions 
    // let transactions = Object.keys(_.groupBy(text.replace(new RegExp('w|r', 'g'), 'T').replace(/\(.\w*\)/gi, '').split(' ')))
    let allTransactions = text.replace(new RegExp('w|r', 'g'), 'T').replace(/\(.\w*\)/gi, '').split(' ');
    let allVariables = text.match(/\(.\w*\)/gi).map(v => v.replace('(', '').replace(')', ''));
    let transactions = allTransactions.reduce( (acc, value) => {
        
        if (acc.length === 0){
            acc.push(value)
        } else if ( acc[acc.length - 1] !== value ){
            acc.push(value)
        }
        return acc;

    }, []);

    let variables = Array.from(new Set(allVariables))

    // variable transaction group
    let _variableTransactionGroup = _.zip(allVariables, allTransactions).map(x => {return {variable: x[0], transaction: x[1]}}).groupBy('transaction')
    let variableTransactionGroup = {}
    Object.keys(_variableTransactionGroup).map((k, i) => {
        variableTransactionGroup[k] = Array.from(new Set(_variableTransactionGroup[k].map(x => x.variable)))
    })


    console.log({variableTransactionGroup: _variableTransactionGroup})
    console.log({variableTransaction: variableTransactionGroup})
    
    // (new RegExp("(|)", 'g'), ''))
    console.log({'extracted' : variables})
    console.log(transactions)
    console.log({allTransactions: allTransactions})
    console.log({allVariables: allVariables});

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

    let nodes = [];
    let _edges = [];

    _.each(Array.from(new Set(transactions)), (T) => {
        nodes.push({data: { id: T, name: T }})
    })

    for (let i = 0; i < transactions.length - 1; i++){
        _edges.push({source: transactions[i],
                    target: transactions[i + 1]
        })
    }

    let edges = _edges.filter(function (a) {
        var key = a.source + '|' + a.target;
        if (!this[key]) {
            this[key] = true;
            return true;
        }
    }, Object.create(null));

    console.log({edges: edges})

    let connectedEdgesByVariable = [];

    for (let j = 0; j < edges.length; j++){
        let sourceVariables = variableTransactionGroup[ edges[j].source ];
        let targetVariables = variableTransactionGroup[ edges[j].target ];

        let commonVariables = _.intersection(sourceVariables, targetVariables);

        if (commonVariables.length > 0){
            connectedEdgesByVariable.push( edges[j] )
        }
    }


    let reducedEdges = connectedEdgesByVariable.map(function(d){
        return {
            data: {
                source: d.source,
                target: d.target
            }
        }

    });

    cytoscape({

        container: document.getElementById('viz'), // container to render in
      
        elements: {
            nodes: nodes,
            edges: reducedEdges
        },

        style: [
            {
                selector: 'node',
                style: {
                    'content' : 'data(name)'
                }
            },
            {
                selector: 'edge',
                style: {
                  'curve-style': 'bezier',
                  'target-arrow-shape': 'triangle'
                }
            },
        ]
    })
    

    }
    
}