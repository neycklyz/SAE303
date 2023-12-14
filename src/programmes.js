import Chart from 'chart.js/auto';

console.log(data);
let db = data[2].data;

// Noms des programmes
const programNames = [...new Set(db.map(d => d.name))];
console.log(programNames);

// Récupérer les datas d'un programme en particulier
function dataOf(program) {
    let programData = db.filter(d => d.name === program);
    return programData;
}

// Récupérer les résultats
let programResults = {};

for (const program of programNames) {
    programResults[program] = {
        countSat: 0,
        countUnknown: 0,
        countUnsat: 0
    };

    for (const d of dataOf(program)) {
        if (d.status === "SAT") {
            programResults[program].countSat++;
        } else if (d.status === "UNSAT") {
            programResults[program].countUnsat++;
        } else {
            programResults[program].countUnknown++;
        }
    }
}

console.log(programResults);

let l = ["Problèmes résolus", "Problèmes sans solution", "Problèmes irréalisables"]

let labels = programNames;
let datasets = ['countSat', 'countUnknown', 'countUnsat'].map((status, index) => {
    return {
        label: l[index],
        data: programNames.map(program => programResults[program][status]),
    };
});

new Chart(
    document.getElementById('programmes'),
    {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.5)',
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.5)',
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    color: 'white',
                    text: '200 problèmes donnés à 10 programmes différents - Tri par programmes'
                },
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    }
);
