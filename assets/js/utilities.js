export const getId = function() {
    return Math.random().toString(10).substring(2, 20);
};

export function sortArrayOfObjectsByKey(array, key, direction) {
    const rtnArr = [...array.sort((a, b) => {
        if(direction == "up"){
            return b[1][key] > a[1][key] ? 1 : -1;
        }
        else{
            return b[1][key] < a[1][key] ? 1 : -1;
        }
    })];

    return rtnArr;
}