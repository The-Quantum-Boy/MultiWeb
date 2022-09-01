

const checkAgo = (time) => {
    if(time <= 24){
        return `${time} hours ago`
    }else if(time <= 730){
        return `${Math.floor(time/24)} days ago`
    }else if(time <= 8766){
        return `${Math.floor(time/24)/30} months ago`
    }

    return `${Math.floor(time/24)/365} years ago`
}

export const convertDateToActualTime = (time) =>{

    const date1 = new Date();
    const date2 = new Date(time);

    const difference = parseInt(Math.abs(date1.getTime() - date2.getTime()) / 3600000)

    return checkAgo(difference);

}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

const months =  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  
export const formatDate = (date) =>{
    const newDate = new Date(date);
    return `${padTo2Digits(newDate.getDate())} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`
}