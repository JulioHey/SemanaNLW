function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetchPopulate("https://servicodados.ibge.gov.br/api/v1/localidades/estados", ufSelect)
}

function populateCitys() {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = true

    fetchPopulate(0, citySelect, true)

    citySelect.disabled = false


}

function fetchPopulate(http, selector,cities=false) {
    if (cities == true) {
        http = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`
    }
    fetch(http)
    .then( res => res.json() )
    .then( states => {
        for (state of states ) {
            selector.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`
        }
    })

}

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionando classe
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //pegar itens selecionados
    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    //se ja estiver selecionado...
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })

        selectedItems = filteredItems

    } else  {
        selectedItems.push(itemId)
    }

    const collectedItems = document.querySelector("input[name=items]")
    collectedItems.value = selectedItems
}

function Cadastro() {
    cityInput = document.querySelector("input[name=cityname]")
    const indexOfSelectedCity = event.target.selectedIndex

    cityInput.value = event.target.options[indexOfSelectedCity].text
}


populateUFs()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", populateCitys)

document
    .querySelector("select[name=city]")
    .addEventListener("change", Cadastro)

// Itens de coleta

const itemsToColect = document.querySelectorAll(".items-grid li")

for (const item of itemsToColect) {
    item.addEventListener("click", handleSelectedItem)
}
