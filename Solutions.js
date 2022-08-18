//Time: O(n) Space: O(n) 
var containsDuplicate = function(nums) {
    var map = new Map();
    
    for(let i = 0; i < nums.length; i++) {
        if(map.get(nums[i]) == undefined)
            map.set(nums[i], true)
        else
            return true
    }
    
    return false;
};

/**
 * Time: O(s + t) Space: O(s + t)  
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length != t.length) return false;
    var mapS = new Map();
    var mapT = new Map();
    
    for(let i = 0; i < s.length; i++){
        let numS = mapS.get(s[i]);
        let numT = mapT.get(t[i]);
        if(numS == undefined)
            mapS.set(s[i], 1);
        else
            mapS.set(s[i], ++numS);
        if(numT == undefined)
            mapT.set(t[i], 1);
        else
            mapT.set(t[i], ++numT);
    }
    
    for(let i = 0; i < s.length; i++){
        if(mapS.get(s[i]) != mapT.get(s[i]))
           return false;
    }
    return true;
};

/**
 * Time: O(m + n) Space: O(n)  
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    var count;
    var map = {};
    
    for(const s of strs){
        count = new Array(26).fill(0);
        for(const c of s)
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
            
        if(map[count])
            map[count].push(s);
        else
            map[count] = [s];
    }
    
    return Object.values(map);
};

/**
 * Time: O(n) Space: O(n)  
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {var count = new Map();
    var freq = new Array(nums + 1).fill(undefined);
    
    //loop to count
    for(const n of nums){
        if(count.get(n)){
            let num = count.get(n);
            count.set(n, ++num);
        }
        else
            count.set(n, 1);
    }
    
    //loop to fill freq array
    for(const [n, c] of count) {
       if(freq[c])
            freq[c].push(n);
        else
            freq[c] = [n];
    }
    
    var ret = []
    //loop to fill top k
    for(var i = freq.length - 1; i > 0; i--){
        if(freq[i]){
            for(let j = 0; j < freq[i].length; j++){
                ret.push(freq[i][j]);
                if(ret.length == k)
                    return ret;
            }
        }
    }
};
