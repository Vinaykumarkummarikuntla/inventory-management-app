function saveToServer(event) {
    event.preventDefault();
    const itemname = event.target.itemname.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;

    const obj = { itemname, description, price, quantity };

    axios.post("http://localhost:5000/postuserdetails", obj)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => { 
            console.log(err);
            document.body.innerHTML = document.body.innerHTML + "<h2> Something went wrong </h2>";
        });
}
window.addEventListener("DOMContentLoaded" ,()=>{

axios.get("http://localhost:5000/postuserdetails")
        .then((response) => {
            result = response.data.itemdata
            for(let i = 1;i<result.length;i++) {
            console.log("the getting data",result[i]);
            showItemDetails(result[i])
            }
        })
        .catch((err) => { 
            console.log(err);
            document.body.innerHTML = document.body.innerHTML + "<h2> Something went wrong </h2>";
        })
    })
function showItemDetails(item){
    parentNode = document.getElementById("itemDetails")
    console.log("onscreen",item.Itemname)
    childHTML = `<li id =  ${item.id}>${item.Itemname} - ${item.Description} - ${item.Price} - ${item.Quantity}
    <button onclick = "decreaseQuantity('${item.id}', 1)">Buy 1</button>
    <button onclick = "decreaseQuantity('${item.id}', 2)">Buy 2</button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}

function decreaseQuantity(itemId,quantity) {

    axios.post("http://localhost:5000/reduceQuantity", { itemId ,quantity})
    .then(response => {
        console.log(response)
        location.reload();
    })
    .catch(err => { 
        console.log(err) 
       document.body.innerHTML += '<h2>Something went wrong item is not found in database</h2>';
    });
    }


