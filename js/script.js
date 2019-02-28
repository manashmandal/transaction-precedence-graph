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

    text = text.trim();
    
    clearAll(); 
        // Replace operations with transactions 
    // let transactions = Object.keys(_.groupBy(text.replace(new RegExp('w|r', 'g'), 'T').replace(/\(.\w*\)/gi, '').split(' ')))
    let transactions = text.replace(new RegExp('w|r', 'g'), 'T').replace(/\(.\w*\)/gi, '').split(' ').reduce( (acc, value) => {
        
        if (acc.length === 0){
            acc.push(value)
        } else if ( acc[acc.length - 1] !== value ){
            acc.push(value)
        }
        return acc;

    }, []);

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

    let reducedEdges = edges.map(function(d){
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

// // create a network
// var container = document.getElementById('viz');

// // provide the data in the vis format
// var data = {
//     nodes: nodes,
//     edges: edges
// };
// var options = {};

// // initialize your network!
// var network = new vis.Network(container, data, options);

// var cy = cytoscape({

//     container: document.getElementById('viz'), // container to render in
  
//     elements: [ // list of graph elements to start with
//       { // node a
//         data: { id: 'a' }
//       },
//       { // node b
//         data: { id: 'b' }
//       },
//       { // edge ab
//         data: { id: 'ab', source: 'a', target: 'b' }
//       }
//     ],
  
//     style: [ // the stylesheet for the graph
//       {
//         selector: 'node',
//         style: {
//           'background-color': '#666',
//           'label': 'data(id)'
//         }
//       },
  
//       {
//         selector: 'edge',
//         style: {
//           'width': 3,
//           'line-color': '#ccc',
//           'target-arrow-color': '#ccc',
//           'target-arrow-shape': 'triangle'
//         }
//       }
//     ],
  
//     layout: {
//       name: 'grid',
//       rows: 1
//     }
  
//   });
