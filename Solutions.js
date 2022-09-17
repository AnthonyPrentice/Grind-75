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

/**
 * Time: O(n) Space: O(n)  
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    var ret = new Array(nums.length)
    
    for(let i = 0; i < nums.length - 1; i++){
        if(i == 0)
            ret[i] = 1;
        ret[i+1] = nums[i]*ret[i];
    }
    
    var post = 1
    for(let i = nums.length - 1; i >= 0; i--){
        if(i == nums.length - 1) continue;
        post *= nums[i+1]
        ret[i] *= post;
    }
    
    return ret;
};

/**
 * Time: O(n) Space: O(n)
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    var map = new Map();
    var largest = 0;
    for(let i = 0; i < nums.length; i++) //space: O(n) time: O(n)
        map.set(nums[i], i);
    
    for(let i = 0; i < nums.length; i++){ 
        if(map.has(nums[i] - 1)) continue;
        else{
            if(largest == 0) largest++;
            let curSize = 1;
            let cur = nums[i] + 1;
            
            while(true){
                if(map.has(cur)){
                    curSize++;
                    cur++;
                }
                else
                    break;
            }
            if(curSize > largest) largest = curSize;
        }
    }
    return largest;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.replace(/[^0-9a-z]/gi, '');
    s = s.toLowerCase();
    
    var limit = Math.floor(s.length/2);
    var length = s.length - 1;
    
    for(let i = 0; i < limit; i++)
        if(s[i] != s[length-i]) return false;
        
    return true;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    var ret = [];
    nums.sort((a, b) => a - b);
    
    for(let i = 0; i < nums.length - 2; i++){
        if(i > 0 && nums[i] == nums[i-1]) continue;
        
        let l, r = i + 1, nums.length - 1;
        while(l < r){
            sum = nums[i] + nums[l] + nums[r];
            if(sum > 0){
                r--;
            }
            else if(sum < 0){
                l++;
            }
            else{
                ret.push([nums[i], nums[l], nums[r]])
                l++;
                while(nums[l] == nums[l-1] && l < r)
                    l++;
                      
            }
        }
    }
    return ret;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    var maxArea = 0;
    var left = 0;
    var right = height.length - 1;
    var x = height.length - 1;
    
    while(left < right){
        let min;
        if(height[left] <= height[right]){
            min = height[left];
            left++;
        }
        else{
            min = height[right];
            right--;
        }
        
        let area = x * min;
        x--;
        if(area > maxArea) maxArea = area;
    }
    
    return maxArea;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if(prices.length == 1) return 0;
    var profit = 0;
    var minIndex = 0
    
    for(let i = 1; i < prices.length; i++){
        if(prices[i] < prices[minIndex])
            minIndex = i;
        if(prices[i] - prices[minIndex] > profit)
            profit = prices[i] - prices[minIndex]
    }
    
    return profit;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if(s.length == 0) return 0;
    var map = new Map();
    var maxLength = 1;
    var min = 0;
    
    for(let i = 0; i < s.length; i++){
        while(map.has(s[i])){
            map.delete(s[min])
            min++;
        }
        map.set(s[i], true);
        if(map.size > maxLength)
            maxLength = map.size;
    }
    
    return maxLength;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var stack = [];
    let map = {
        ')':'(',
        ']':'[',
        '}':'{'
    }
    
    for(let i = 0; i < s.length; i ++){
        let tail = stack.length - 1;
        if(s[i] == '(' || s[i] == '[' || s[i] == '{')
            stack.push(s[i])
        else if(s[i] == ')' || s[i] == ']' || s[i] == '}'){
            if(map[s[i]] != stack[tail])
                return false
            else
                stack.pop();
        }
    }
    
    return !stack.length;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    var head = new ListNode(0, null)
    var cur = head;
    
    while(list1 && list2){
        if(list1.val <= list2.val){
            cur.next = list1;
            list1 = list1.next;
        }
        else{
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 || list2;
    if(!list1 && !list2) cur.next = null;
    
    return head.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let [prev, current] = [null, head]
    
    while(current){
        [current.next, prev, current] = [prev, current, current.next];
    }
    
    return prev;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    var stack = [root];
    
    while(stack.length){
        let cur = stack.pop();
        if(cur == null) continue;
        if(cur.left) stack.push(cur.left);
        if(cur.right) stack.push(cur.right);
        let temp = cur.left;
        cur.left = cur.right;
        cur.right = temp;
    }
    
    return root;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

//recursive DFS
var maxDepth = function(root) {
    if(!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    let stack1 = [p]
    let stack2 = [q]
    let node1, node2;
    
    while(stack1.length && stack2.length){
        node1 = stack1.pop();
        node2 = stack2.pop();
        if(!node1 && !node2);
        else if((node1 && !node2) || (!node1 && node2)) return false;
        else if(node1.val != node2.val) return false;
        else{
            stack1.push(node1.left, node1.right);
            stack2.push(node2.left, node2.right);  
        }
    }
    if(stack1.length && !stack2.length) return false;
    if(!stack1.length && stack2.length) return false;
    
    return true;
};

/**
 * @param {number} n
 * @return {number}
 */

var climbStairs = function(n) {
    var distinct = (c, n, map) => {
        if(map.has(c))
            return map.get(c);
        if(c > n){
            map.set(c, 0);
            return 0;
        }
        if(c == n){
            map.set(c, 1);
            return 1;
        }
        let result = distinct(c+1, n, map) + distinct(c+2, n, map);
        map.set(c, result);
        return result;
    }
    
    return distinct(0, n, new Map());
}

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    let count = [];
    let res = 0;
    
    let left = 0;
    for(let right = 0; right < s.length; right++){
        let wl, lrc; //window length | longest repeating character
        let char = s[right];
        
        if(char in count) ++count[char];
        else count[char] = 1;
        
        wl = right - left + 1;
        lrc = Math.max.apply(Math, Object.values(count));
        
        while((wl - lrc) > k){
            --count[s[left]];
            ++left;
            --wl;
        }
        
        //update longest
        if(wl > res) res = wl;
    }
    
    return res;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    var max = 0;
    var dfs = (node) => {
        if(!node) return 0;
        if(!node.left && !node.right) return 0;
        
        let left = dfs(node.left);
        let right = dfs(node.right);
        
        if(node.left && node.right)
            if(max < (left + right + 2)) max = left + right + 2;
        if(max < (1 + Math.max(left, right))) max = 1 + Math.max(left, right);
        
        return 1 + Math.max(left, right);
    }
    dfs(root);
    
    return max;
};

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    for(let r = 0; r < 9; r++){
        let cVisited = new Map();
        for(let c = 0; c < 9; c++){
            if(board[r][c] === '.') continue;
            if(cVisited.has(board[r][c])) return false;
            else cVisited.set(board[r][c], true);
        }
    }
    
    for(let c = 0; c < 9; c++){
        let rVisited = new Map();
        for(let r = 0; r < 9; r++){
            if(board[r][c] === '.') continue;
            if(rVisited.has(board[r][c])) return false;
            else rVisited.set(board[r][c], true);
        }
    }
    
    let blocks = new Map();
    for(let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++){
            if(board[r][c] === '.') continue;
            let key = String([Math.floor(r/3), Math.floor(c/3)]);
            if(blocks.has(key)) {
                let arr = blocks.get(key);
                if(arr.includes(board[r][c])) return false;
                else {
                    arr.push(board[r][c])
                    blocks.set(key, arr); 
                }
            }
            else blocks.set(key, [board[r][c]]);
        }
    }
    
    return true;
};

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while(left < right){
        let sum = numbers[left] + numbers[right];
        if(sum == target) 
            return [left + 1, right + 1];
        else if(sum > target)
            right--;
        else
            left++;
    }
};

var Trie = function() {
    this.node = {};
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let iter = this.node;
    for(let c of word){
        if(iter[c])
            iter = iter[c]
        else{
            iter[c] = {}
            iter = iter[c];
        }
    }
    iter.isWord = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let iter = this.node;
    for(let c of word){
        if(iter[c])
            iter = iter[c];
        else
            return false;
    }
    return (iter.isWord ? true : false);
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let iter = this.node;
    for(let c of prefix){
        if(iter[c])
            iter = iter[c];
        else
            return false;
    }
    return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = 0;
    
    for(let num of nums)
        res = num ^ res;
    
    return res;
};

/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let res = 0;
    
    while(n){
        res += n & 1;
        n = n >>> 1;
    }
    
    return res;
};

/**
 * @param {number} k
 * @param {number[]} nums
 */
function PriorityQueue(nums) {
    this.nums = nums;
    
    this.heapify = () => {
        if(this.size() < 2) return;
        for(let i = 1; i < this.size(); i++)
            this.bubbleUp(i);
    }
    this.bubbleUp = (index) => {
        while(index != 0){
            let parentIndex = (index - 1) >> 1;
            if(this.compare(this.nums[index], this.nums[parentIndex]) < 0) {
                this.swap(index, parentIndex);
                index = parentIndex;
            }
            else break;
        }        
    }
    this.bubbleDown = (index) => {
        let last = this.size() - 1;
        while(true) {
            let left = (index*2) + 1;
            let right = (index*2) + 2;
            let cur = index;
            if(left <= last && this.compare(this.nums[left], this.nums[cur]) < 0)
                cur = left;
            if(right <= last && this.compare(this.nums[right], this.nums[cur]) < 0)
                cur = right;
            if(cur != index) {
                this.swap(cur, index)
                index = cur;
            }
            else break;
        }
    }
    this.swap = (index1, index2) => {
        [this.nums[index1], this.nums[index2]] = [this.nums[index2], this.nums[index1]];
    }
    this.insert = (val) => {
        this.nums.push(val);
        this.bubbleUp(this.size() - 1);
    }
    this.pop = () => {
        if(this.size() == 0) return null;
        let ret = this.nums[0];
        let last = this.nums.pop();
        if(this.size() != 0){
            this.nums[0] = last;
            this.bubbleDown(0);
        }
        return ret;
    }
    this.peek = () => (this.size() > 0 ? this.nums[0] : null);
    this.compare = (a, b) => a - b;
    this.size = () => this.nums.length;
    this.print = () => console.log(this.nums);
    this.heapify();
}

var KthLargest = function(k, nums) {
    this.limit = k;
    this.minHeap = new PriorityQueue(nums);
    while(this.minHeap.size() > this.limit)
        this.minHeap.pop();
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    this.minHeap.insert(val);
    while(this.minHeap.size() > this.limit)
        this.minHeap.pop();
    return this.minHeap.peek();
};

/** 
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

function PriorityQueue(nums) {
    this.nums = nums;
    
    this.heapify = () => {
        if(this.size() < 2) return;
        for(let i = 1; i < this.size(); i++)
            this.bubbleUp(i);
    }
    this.insert = (val) => {
        this.nums.push(val);
        this.bubbleUp(this.size() - 1);
    }
    this.pop = () => {
        if(!this.size()) return null;
        let ret = this.nums[0];
        let last = this.nums.pop();
        if(this.size()){
            this.nums[0] = last;
            this.bubbleDown(0);
        }
        return ret;
    }
    this.bubbleUp = (index) => {
        while(index > 0){
            let pIndex = (index - 1) >> 1;
            if(this.compare(this.nums[index], this.nums[pIndex]) > 0) {
                this.swap(index, pIndex);
                index = pIndex;
            }
            else break;
        }
    }
    this.bubbleDown = (index) => {
        while(true){
            let gIndex = index;
            let lIndex = (gIndex * 2) + 1;
            let rIndex = (gIndex * 2) + 2;
            if(lIndex < this.size() &&
               this.compare(this.nums[lIndex], this.nums[gIndex]) > 0)
                gIndex = lIndex;
            if(rIndex < this.size() &&
               this.compare(this.nums[rIndex], this.nums[gIndex]) > 0)
                gIndex = rIndex;
            if(index != gIndex){
                this.swap(index, gIndex);
                index = gIndex;
            }
            else break;
        }
        
    }
    this.swap = (index1, index2) => {
        [this.nums[index1], this.nums[index2]] = [this.nums[index2], this.nums[index1]];
    }
    this.compare = (a, b) => a-b;
    this.size = () => this.nums.length;
    this.peek = () => (this.size() ? this.nums[0] : null);
    this.heapify();
}

var lastStoneWeight = function(stones) {
    let maxHeap = new PriorityQueue(stones);
    while(maxHeap.size() > 1){
        let y = maxHeap.pop();
        let x = maxHeap.pop();
        console.log(y);
        console.log(x); 
        console.log(maxHeap.nums);
        console.log("---------")
        if(x == y) continue;
        else maxHeap.insert(y - x);
    }
    if(maxHeap.size()) return maxHeap.pop();
    else return 0;
};

function PriorityQueue(nums){
    this.nums = nums;
    
    this.heapify = () => {
        if(this.size() < 2) return;
        for(let i = 0; i < this.size(); i++)
            this.bubbleUp(i);
    }
    this.insert = (val) => {
        this.nums.push(val);
        this.bubbleUp(this.size() - 1);
    }
    this.pop = () => {
        let ret = this.nums[0];
        let last = this.nums.pop();
        if(this.size()){
            this.nums[0] = last;
            this.bubbleDown(0);
        }
        return ret;
    }
    this.bubbleUp = (index) => {
        while(index > 0){
            let parent = (index - 1) >> 1;
            if(this.compare(this.nums[index], this.nums[parent]) < 0) {
                this.swap(index, parent);
                index = parent;
            }
            else break;
        }
    }
    this.bubbleDown = (index) => {
        while(true){
            let left = (index * 2) + 1;
            let right = (index * 2) + 2;
            let iter = index;
            if(left < this.size() &&
               this.compare(this.nums[left], this.nums[iter]) < 0)
                iter = left;
            if(right < this.size() &&
               this.compare(this.nums[right], this.nums[iter]) < 0)
                iter = right;
            if(iter != index){
                this.swap(iter, index);
                index = iter;
            }
            else break;
        }
    }
    this.compare = (a,b) => a-b;
    this.swap = (index1, index2) => {
        [this.nums[index1], this.nums[index2]] = [this.nums[index2],                      this.nums[index1]]
    }
    this.size = () => this.nums.length;
    this.peek = () => (this.size() ? this.nums[0] : null);
    this.heapify();
}

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    let ret = [];
    let limit = k;
    let map = new Map();
    let distances = []
    
    for(let point of points){
        let x = point[0];
        let y = point[1];
        let dist = Math.sqrt(x*x + y*y)
        distances.push(dist);
        if(!map.has(dist))
            map.set(dist, [point]);
        else {
            let arr = map.get(dist);
            arr.push(point);
            map.set(dist, arr);
        }
    }
    
    let minHeap = new PriorityQueue(distances);
    while(true){
        let dist = minHeap.pop();
        let arr = map.get(dist);
        for(let i = 0; i < arr.length; i++) {
            if(limit){
                let point = arr[i];
                ret.push(point);
                --limit;
            }
            else break
        }
        if(!limit) break;
    }
    return ret;
};
