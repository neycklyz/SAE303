import Chart from 'chart.js/auto';

console.log(data);
let db = data[2].data;

// Noms des programmes
const programNames = [...new Set(db.map(d => d.name))];
console.log(programNames);

// Récupérer les datas d'un programme particulier
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

let colors = [
    'rgb(216, 73, 95)',
    'rgb(204, 50, 132)',
    'rgb(144, 68, 147)',
    'rgb(134, 51, 208)',
    'rgb(93, 115, 215)',
    'rgb(50, 144, 158)',
    'rgb(50, 140, 123)',
    'rgb(65, 148, 94)',
    'rgb(174, 123, 56)',
    'rgb(210, 89, 53)'
];

// Définir les labels et les valeurs
let labels = ['Nombre de problèmes résolus', 'Nombre de problèmes sans solution', 'Nombre de problèmes irréalisables'];
let datasets = programNames.map((program, index) => ({
    label: program,
    data: [programResults[program].countSat, programResults[program].countUnknown, programResults[program].countUnsat],
    backgroundColor: colors[index],
}));



new Chart(
    document.getElementById('problemes'),
    {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            color: 'white',
            plugins: {
                title: {
                    display: true,
                    color: 'white',
                    text: '200 problèmes donnés à 10 programmes différents - Tri par résultats'
                },
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.3)'
                    }
                },
                x: {
                    offset: true,
                    stacked: false,
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.3)'
                    }
                }
            },

        }
    }
);