
/**
 * 
 * @param {*} l,r
 * @description Function to merge Sorted Array Pairs
 * @returns result
 */

function merge_two_post_list(l, r) {
    var result = [];

    /**Array Pointers */
    let l_in = 0;
    let r_in = 0;

    while (result.length < (l.length + r.length)) {
        let isLDepleted = l_in >= l.length;
        let isRDepleted = r_in >= r.length;

        if (!isLDepleted && (isRDepleted || (l[l_in].created_at <= r[r_in].created_at))) {
            result.push(l[l_in++]);

        } else
            result.push(r[r_in++]);

    }

    return result;
}


/**
 * 
 * @param {*} arr 
 * @description Function to merge all the arrays after Each Pair Merging
 * @returns arr
 */
function merge_posts(arr) {

    var arr_s = [];

    while (arr.length != 1) {
        arr_s = [];
        for (var i = 0; i < arr.length; i += 2) {
            if (i == arr.length-1)
                arr_s.push(arr[i]);

            else arr_s.push(merge_two_post_list(arr[i], arr[i + 1]));
        }

        arr = arr_s;
    }

    return arr[0];
}


/**
 * 
 * @param {*} arr 
 * @returns result
 * @description Remove Duplicates and Sort in descending order
 */
function remove_duplicate_and_descend(arr) {
    let hash = {};
    let result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        if (!(arr[i].id in hash)) {
            hash[arr[i].id] = 0;
            result.push(arr[i]);
        }
    }
    return result;
}




//Re-order sorted array for id precedence.
function prioritize_id_for_created_at(arr) {
    let result = [];
    let i=0;
    let j=0;
    let temp = [];

    while(j< arr.length){
        // console.log(temp)
        let length_condition = j == arr.length-1;
        let comparison_condition = arr[j+1] && arr[j].created_at !== arr[j+1].created_at;


        if((i === j) && (length_condition ||  comparison_condition) && temp.length == 0){
            result.push(arr[j++]);
            i++;
        }
        else if(temp.length >=0 && (length_condition || comparison_condition )){
            // temp.push(arr[j])
            // Do some processing and sorting here
            temp.push(arr[j++]);
            temp.sort((a,b)=> b.id - a.id); //For Illustration Purpose(Merge Sort);
            result.push(...temp);
            temp = [];
            i++;
        }else{
            temp.push(arr[j++]);
        }
    }

return result;

}





// Test Post Data
let arr = [
    [{
        id: 1,
        description: "description",
        image: "url",
        created_at: 10
    },
    {
        id: 2,
        description: "description 12 precedence 1",
        image: "url",
        created_at: 10
    },
    {
        id: 2000,
        description: "description",
        image: "url",
        created_at: 5004
    },
    {
        id: 3009,
        description: "description 2004 99",
        image: "url",
        created_at: 5004
    }

    ],



    [{
        id: 4,
        description: "description",
        image: "url",
        created_at: 8
    },
    {
        id: 8,
        description: "description 12 precedence 3",
        image: "url",
        created_at: 12
    },
    {
        id: 6,
        description: "description",
        image: "url",
        created_at: 19
    },
    {
        id: 1000,
        description: "2004 12 precedence 1",
        image: "url",
        created_at: 2004
    },
    {
        id: 1000,
        description: "2004 12 precedence 1",
        image: "url",
        created_at: 2004
    },
    ],

    [{
        id: 4,
        description: "description",
        image: "url",
        created_at: 80
    },
    {
        id: 10,
        description: "description",
        image: "url",
        created_at: 90
    },
    {
        id: 10000,
        description: "description",
        image: "url",
        created_at: 500
    },
    {
        id: 6,
        description: "description",
        image: "url",
        created_at: 2000
    }],
]
// Merged sorted array
var output = merge_posts(arr);
let result = remove_duplicate_and_descend(output);
let ordered_result = prioritize_id_for_created_at(result);
console.log(ordered_result);
