import { promises as fs } from "fs";

const items = await fs.readdir("stores",{withFileTypes:true});
for(let item of items){
    const type = item.isDirectory()?"folder":"file";
    console.log(`${item.name}: ${type}`);
}
console.log(items); // [ 201, 202, sales.json, totals.txt ]

async function findFiles(folderName){
    const items = await fs.readdir(folderName,{withFileTypes:true});
    items.forEach((item)=>{
        if(item.isDirectory()){
            findFiles(`${folderName}/${item.name}`)
        }else{
            console.log(`Found file: ${item.name} in folder: ${folderName}`);
        }
    });
    
}

findFiles("stores");