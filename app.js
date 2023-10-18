'use strict'

async function resposta() {
    const url = "http://makeup-api.herokuapp.com/api/v1/products.json"
    const pesquisa = document.getElementById('pesquisa').value
    const resultadosDiv = document.getElementById('resultados')
    const mensagemCarregamento = document.getElementById('mensagem-carregamento')

    mensagemCarregamento.style.display = 'block'

    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()

            const resultadosLimitados = data.slice(0, 30)

            const resultadosFiltrados = resultadosLimitados.filter(item => {
                return item.name.toLowerCase().includes(pesquisa.toLowerCase())
            })

            exibirResultados(resultadosFiltrados)
            mensagemCarregamento.style.display = 'none'
        } else {
            console.error("Erro na requisição. Código de status: " + response.status)
            mensagemCarregamento.style.display = 'none'
        }
    } catch (error) {
        console.error("Ocorreu um erro ao fazer a requisição:", error)
        mensagemCarregamento.style.display = 'none'
    }
}

function exibirResultados(resultados) {
    const resultadosDiv = document.getElementById('resultados')
    resultadosDiv.innerHTML = ''

    if (resultados.length === 0) {
        resultadosDiv.innerHTML = 'Nenhum resultado encontrado.'
        return
    }

    resultados.forEach(item => {
        const itemDiv = document.createElement('div')
        itemDiv.textContent = item.name
        resultadosDiv.appendChild(itemDiv)
    })
}

document.getElementById('buscar').addEventListener('click', resposta)