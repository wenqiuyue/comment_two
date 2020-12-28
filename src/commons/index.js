/**
 * 时间显示成英文,2020/12/1 (December 1, 2020)
 */
export function dateEnglish(date){
  const m=new Date(date).getMonth()+1;
  const y=new Date(date).getFullYear();
  const d=new Date(date).getDate();
  if(m==1){
    return `January ${d}, ${y}`
  }else if(m==2){
    return `February ${d}, ${y}`
  }else if(m==3){
    return `March ${d}, ${y}`
  }else if(m==4){
    return `April ${d}, ${y}`
  }else if(m==5){
    return `May ${d}, ${y}`
  }else if(m==6){
    return `June ${d}, ${y}`
  }else if(m==7){
    return `July ${d}, ${y}`
  }else if(m==8){
    return `August ${d}, ${y}`
  }else if(m==9){
    return `September ${d}, ${y}`
  }else if(m==10){
    return `October ${d}, ${y}`
  }else if(m==11){
    return `November ${d}, ${y}`
  }else if(m==12){
    return `December ${d}, ${y}`
  }else{
    return '111'
  }
}