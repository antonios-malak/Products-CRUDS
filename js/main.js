var nameInput = document.getElementById("name") 
var categoryInput = document.getElementById("category")
var priceInput = document.getElementById("price")
var tbody = document.getElementById("tbody")
var addBtn = document.getElementById("addBtn")
var searchInput = document.getElementById("searchInput")
var productsArr = []
var isInUpdateMode = false 
var updatedIndex ;

if (localStorage.getItem("productsArr") != null ){
    productsArr = JSON.parse(localStorage.getItem("productsArr"))
    display()
}



function addproduct() {
    var product = {
        name : nameInput.value ,
        category : categoryInput.value ,
        price : priceInput.value ,
    }
    var nameRegex=/^[A-za-z0-9\W]{3,30}$/g;
    var categoryRegex=/^[A-za-z]{3,30}$/g ;
    var priceRegex=/^[0-9]{0,6}$/g;
    if(nameRegex.test(product.name) && categoryRegex.test(product.category) &&  priceRegex.test(product.price)){
        if (!isInUpdateMode){
            productsArr.push(product);
        }else{
            productsArr.splice( updatedIndex , 1 , product);
            addBtn.textContent = "Add Product";
            isInUpdateMode = false ;
        }
    }else{
        window.alert("please add a valid product")
    }
    localStorage.setItem("productsArr" , JSON.stringify(productsArr));
    clearInputs() 
    display()   
};


function clearInputs(){
    nameInput.value = ""
    categoryInput.value = ""
    priceInput.value = ""
};

function display(){
    var insertedRow = "" ;
    for(i=0 ; i<productsArr.length ; i++){
        insertedRow += 
        `<tr>
        <td>${i+1}</td>
        <td>${productsArr[i].name}</td>
        <td>${productsArr[i].category}</td>
        <td>${productsArr[i].price}</td>
        <td><button type="button" class="btn btn-outline-success" onclick="backData(${i})">Update</button></td>
        <td><button type="button" class="btn btn-outline-danger" onclick="remove(${i})">Remove</button></td>
        </tr>`
    }
    tbody.innerHTML=insertedRow ;
};

function remove(i){
    productsArr.splice(i , 1);

    localStorage.setItem("productsArr" , JSON.stringify(productsArr));
    display();
};

function backData(Pindex){
    updatedIndex = Pindex ;
    nameInput.value = productsArr[Pindex].name 
    categoryInput.value = productsArr[Pindex].category 
    priceInput.value = productsArr[Pindex].price  
    
    addBtn.textContent = "Update Product" ;
    isInUpdateMode = true ;

}

function search(){
var insertedRow = "" ;
for ( var i=0 ; i< productsArr.length ; i++ ){
    var searchTerm =searchInput.value.toLowerCase();
    if (productsArr[i].name.toLowerCase().includes(searchTerm)){        
        insertedRow += 
        `<tr>
        <td>${i+1}</td>
        <td>${productsArr[i].name}</td>
        <td>${productsArr[i].category}</td>
        <td>${productsArr[i].price}</td>
        <td><button type="button" class="btn btn-outline-success" onclick="backData(${i})">Update</button></td>
        <td><button type="button" class="btn btn-outline-danger" onclick="remove(${i})">Remove</button></td>
        </tr>`
    };
    };
    tbody.innerHTML=insertedRow ;
};





