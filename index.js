let myLeads =[]

const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render()
}

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render()
    })
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render()
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value =""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render()
})

function render(){
let listItems =""
for(let i=0;i< myLeads.length; i++){
    
    listItems += `<li>
                <a target="_blank" href="${myLeads[i]}"> 
                    ${myLeads[i]}
                </a>
                </li>`
    }
    ulEl.innerHTML = listItems 
}