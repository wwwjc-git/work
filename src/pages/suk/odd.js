 export function odd(a,shopname){ 
        const result = a.map(item => { 


          return item.suklist.map(val => { 
            return { 
              [item.id]:val 
            } 
          }) 
        }) 
        while(result.length > 1){ 
          const temp = [] 
          for(let f = 0; f< result[0].length; f ++){ 
              for(let s = 0; s< result[1].length; s ++){ 
                 temp.push({ 
                   ...result[0][f], 
                   ...result[1][s] 
                 }) 
              } 
          } 
          result.splice(0, 2, temp) 
        } 
        return (filterarr(result[0],shopname))
      
}
function filterarr(arr,shopname='小米'){
  arr.forEach((res,index)=>{
    res.tableId=index+1;
    res.tableLocalName=''
    res.tableCostPrice=''
    res.tableSalePrice=''
    res.tablePic=''
  })

  return arr
}