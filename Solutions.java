class Solution {
    public int[] replaceElements(int[] arr) {
        int[] ret = new int[arr.length];
        Integer[] sorted = Arrays.stream(arr).boxed().toArray( Integer[]::new ); //n
        Arrays.sort(sorted, Collections.reverseOrder()); //nlogn
        Map<Integer, Integer> indexes = new HashMap();
        for(int i = 0; i < arr.length; i++) //n
            indexes.put(arr[i], i);
        
        int iter = 0;
        int iter_val;
        int iter_index;
        for(int i = 0; i < ret.length; i++) {
            if(i == (ret.length - 1)) 
                ret[i] = -1;
            while(iter < ret.length) {
                iter_val = sorted[iter].intValue();
                iter_index = indexes.get(iter_val);
                if(i < iter_index) {
                    ret[i] = iter_val;
                    break;
                }
                else iter++;
            }
        }
        
        return ret;
    }
}

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(-1, head);
        ListNode left = dummy;
        ListNode right = head;
        
        for(int i = 1; i < n; i++)
            right = right.next;
        
        while(right.next != null) {
            left = left.next;
            right = right.next;
        }
        
        left.next = left.next.next;
        return dummy.next;
    }
}

/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/
class Solution {
    public static void bfs(ArrayList<Node> queue, Map<Integer, Node> map){
        int iter = 0;
        while(iter < queue.size()){
            Node cur = queue.get(iter);
            for(Node n : cur.neighbors){
                if(!map.containsKey(n.val)){
                    queue.add(n);
                    map.put(n.val, new Node(n.val));
                }
            }
            iter++;
        }
    }
    
    public static void addNeighbors(ArrayList<Node> queue, Map<Integer, Node> map) {
        while(queue.size() != 0){
            Node cur = queue.get(0);
            Node newNode = map.get(cur.val);
            for(Node n : cur.neighbors) {
                Node neighbor = map.get(n.val);
                newNode.neighbors.add(neighbor);
            }
            queue.remove(0); 
        }
        
    }

    public Node cloneGraph(Node node) {
        if(node == null) return null;
        ArrayList<Node> queue = new ArrayList(Arrays.asList(node));
        Map<Integer, Node> map = new HashMap<Integer, Node>();
        map.put(node.val, new Node(node.val));

        bfs(queue, map);
        addNeighbors(queue, map);
        
        return map.get(node.val);
    }
}

class MedianFinder {
    PriorityQueue<Double> left, right;
    
    public void handleNulls(double num) {
        if(left.peek() == null) {
            left.add(num);
            return;
        }
        if(right.peek() == null){
            if(num < left.peek()){
                double temp = left.poll();
                left.add(num);
                right.add(temp);
            }
            else right.add(num);
            return;
        }
    }
    
    public MedianFinder() {
        this.left = new PriorityQueue<>(Comparator.reverseOrder());
        this.right = new PriorityQueue<>();
    }
    
    public void addNum(double num) {
        if(left.peek() == null || right.peek() == null){
            handleNulls(num);
            return;
        }
        double lLen = this.left.size();
        double rLen = this.right.size();
        double lTop = this.left.peek();
        double rTop = this.right.peek();
        if(lLen <= rLen) {
            if(num > rTop) {
                double temp = right.poll();
                right.add(num);
                left.add(temp);
            }
            else left.add(num);
        }
        else {
            if(num < lTop){
                double temp = left.poll();
                left.add(num);
                right.add(temp);
            }
            else right.add(num);
        }
    }
    
    public double findMedian() {
        int size = left.size() + right.size();
        boolean isEven = (size % 2 == 0) ? true : false;
        
        if(size == 1) return left.peek();
        if(isEven) return ( (left.peek() + right.peek()) / 2);
        else {
            if(left.size() > right.size()) return left.peek();
            else return right.peek();
        }
    }
}

class Solution {
    //recursion/iterative
    //dfs 
    //upper and lower bounds
    
    public boolean dfs(TreeNode root, Integer min, Integer max) {
        if(root == null) return true;
        if(max != null) {
            if(root.val >= max) 
                return false;
        }
        if(min != null) {
            if(root.val <= min) 
                return false;
        }
        
        boolean valid_left = dfs(root.left, min, root.val);
        boolean valid_right = dfs(root.right, root.val, max);
        if(valid_left && valid_right) return true;
        else return false;
    }
    
    public boolean isValidBST(TreeNode root) {
         return dfs(root, null, null);
    }
}

class Solution {
    public boolean dfs(int x, int y, int i, String word, char[][] board) {
        if( i == word.length() ) return true;
        if( x < 0 || x >= board.length || 
            y < 0 || y >= board[x].length) return false;
        
        Boolean ret = false;
        char c = board[x][y];
        if(c == word.charAt(i)) {
            board[x][y] = '*';

            ret = ( dfs(x + 1, y, i+1, word, board) ||
                    dfs(x - 1, y, i+1, word, board) ||
                    dfs(x, y + 1, i+1, word, board) ||
                    dfs(x, y - 1, i+1, word, board) );

            board[x][y] = c;
        }

        return ret;
    }

    public boolean exist(char[][] board, String word) {

        for(int x = 0; x < board.length; x++) {
            for(int y = 0; y < board[x].length; y++) {
                if( dfs(x, y, 0, word, board) ) 
                    return true;
            }
        }

        return false;
    }
}

//slow, fast set to head
//find mid
//reverse 2nd half
//check palindrome

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public boolean isPalindrome(ListNode head) {
        if(head.next == null) return true;
        else if (head.next.next == null) return (head.val == head.next.val);
        ListNode slow = head, fast = head;
        int mid = 0;

        while(true){
            if(fast.next == null) break;
            else if(fast.next.next == null) {
                mid++;
                break;
            }
            else {
                slow = slow.next;
                fast = fast.next.next;
                mid++;
            }
        }

        slow = slow.next;
        ListNode temp = null, prev = null;
        while(slow != null){
            temp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = temp;
        }

        ListNode iter = head;
        for(int i = 0; i < mid; i++) {
            if(iter.val != prev.val) return false;
            iter = iter.next;
            prev = prev.next;
        }
        
        return true;
    }
}

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        Queue<ListNode> pq = new PriorityQueue<>(new Comparator<ListNode>() {
            @Override
            public int compare(ListNode n1, ListNode n2){
                if(n1.val < n2.val)
                    return -1;
                else if(n1.val > n2.val)
                    return 1;
                else   
                    return 0;
            }
        });

        for(ListNode n : lists){
            ListNode iter = n;
            while(iter != null){
                pq.offer(iter);
                iter = iter.next;
            }
        }

        ListNode dummy = new ListNode();
        ListNode iter = dummy;
        while(pq.size() != 0){
            iter.next = pq.poll();
            iter = iter.next;
        }
        iter.next = null;

        return dummy.next;
    }
}

class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> ret = new ArrayList<>();
        int rows_len = heights.length;
        int cols_len = heights[0].length;
        boolean[][] pac = new boolean[rows_len][cols_len];
        boolean[][] atl = new boolean[rows_len][cols_len];

        for(int r = 0; r < rows_len; r++) {
            dfs(r, 0, rows_len, cols_len, pac, new boolean[rows_len][cols_len], heights[r][0], heights);
            dfs(r, cols_len - 1, rows_len, cols_len, atl, new boolean[rows_len][cols_len], heights[r][cols_len - 1], heights);
        }
        for(int c = 0; c < cols_len; c++) {
            dfs(0, c, rows_len, cols_len, pac, new boolean[rows_len][cols_len], heights[0][c], heights);
            dfs(rows_len - 1, c, rows_len, cols_len, atl, new boolean[rows_len][cols_len], heights[rows_len - 1][c], heights);
        }

        for(int r = 0; r < rows_len; r++) 
            for(int c = 0; c < cols_len; c++) 
                if(pac[r][c] && atl[r][c])
                    ret.add(Arrays.asList(r,c));

        return ret;
    }

    public void dfs(int r, int c, int rows_len, int cols_len, boolean[][] reached, boolean[][] traversal, int prevHeight, int[][] heights) {
        if(r < 0 || r >= rows_len || c < 0 || c >= cols_len || traversal[r][c] == true || prevHeight > heights[r][c])
            return;

        traversal[r][c] = true;
        reached[r][c] = true;
        dfs(r + 1, c, rows_len, cols_len, reached, traversal, heights[r][c], heights);
        dfs(r - 1, c, rows_len, cols_len, reached, traversal, heights[r][c], heights);
        dfs(r, c + 1, rows_len, cols_len, reached, traversal, heights[r][c], heights);
        dfs(r, c - 1, rows_len, cols_len, reached, traversal, heights[r][c], heights);
    }
}

class Solution {
    List<Integer> array;
    int k;

    public void inOrder(TreeNode root) {
        if(root.left != null) 
            inOrder(root.left); 

        if(this.array.size() == k) return;
        this.array.add(root.val);

        if(root.right != null) 
            inOrder(root.right); 
    }

    public int kthSmallest(TreeNode root, int k) {
        this.array = new ArrayList<>();
        this.k = k;

        inOrder(root);

        int size = this.array.size();
        int ret = this.array.get(size - 1);
        return ret;
    }
}

class Solution {
    public boolean validPalindrome(String s) {
        int l = 0;
        int r = s.length() - 1;

        for(int i = 0; i < s.length() / 2; i++) {
            if( s.charAt(l) == s.charAt(r) ) {
                l++;
                r--;
            }
            else return isPalindrome(s, l + 1, r) || isPalindrome(s, l, r - 1);
        }

        return true;
    }

    public boolean isPalindrome(String s, int left, int right) {
        if(left >= right) return true;
        if( s.charAt(left) != s.charAt(right) ) return false;
        else return isPalindrome(s, left + 1, right - 1);
    }
}

class Solution {
    public int getIndex(int[] array, int value){
        for(int i = 0; i < array.length; i++)
            if(array[i] == value)
                return i;
        return -1;
    }

    public TreeNode rec(int[] preorder, int[] inorder, int inStart, int inEnd, int preStart, int preEnd) {
        if(inStart > inEnd || preStart > preEnd) return null;
        int[] in = Arrays.copyOfRange(inorder, inStart, inEnd);
        int[] pre = Arrays.copyOfRange(preorder, preStart, preEnd); 

        if(pre.length == 0 || in.length == 0) return null;
        Integer mid = getIndex(in, pre[0]);
        TreeNode root = new TreeNode(pre[0]);

        root.left = rec(pre, in, 0, mid, 1, mid + 1); 
        root.right = rec(pre, in, mid + 1, in.length, mid + 1, pre.length);
        
        return root;
    }

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return rec(preorder, inorder, 0, inorder.length, 0, preorder.length);
    }
}

class Solution {
    public Boolean dfs(ArrayList[] edges, Boolean[] visited, Integer current, Boolean[] dp) {
        if(visited[current]) return false; 
        if(dp[current] != null) return true;
        visited[current] = true;

        for(int i = 0; i < edges[current].size(); i++)
            if( !dfs(edges, visited, (int)edges[current].get(i), dp) ) 
                return false;   

        dp[current] = true;
        visited[current] = false;
        return true;
    }

    public boolean canFinish(int numCourses, int[][] prerequisites) {
        ArrayList[] edges = new ArrayList[numCourses];
        Boolean[] visited = new Boolean[numCourses];
        Boolean[] dp = new Boolean[numCourses];

        for(int i = 0; i < numCourses; i++) {
            edges[i] = new ArrayList<Integer>();
            visited[i] = false;
        }

        for(int[] pair : prerequisites) 
            edges[pair[0]].add(pair[1]);

        for(int i = 0; i < numCourses; i++){
            if( !dfs(edges, visited, i, dp) )
                return false;
        }
        
        return true;   
    }
}

class Solution {
    public int dfs(int p, String s, Integer[] mem) {
        if(p >= s.length()) return 1;
        if(s.charAt(p) == '0') return 0;
        if(mem[p] != null) return mem[p];

        int res1 = dfs(p+1, s, mem);
        int res2 = 0;

        if(p < s.length() - 1 && (s.charAt(p) == '1' || s.charAt(p) == '2' && s.charAt(p+1) < '7'))
            res2 = dfs(p+2, s, mem);
        
        mem[p] = res1 + res2;
        return mem[p];
    }
    public int numDecodings(String s) {
        int size = s.length();
        Integer[] mem = new Integer[size];
        return size == 0 ? 0 : dfs(0, s, mem);
    }
}

class Solution {
    public int coinChange(int[] coins, int amount) {
        if(amount == 0) return 0;

        Queue<Integer> queue = new LinkedList<>();
        for(int c : coins) queue.add(c);
        int level = queue.size();
        HashSet<Integer> dup = new HashSet<>();
        int ret = 1;

        while(queue.size() > 0) {
            if(level == 0){
                ret++;
                level = queue.size();
            }

            int cur = queue.poll();
            level--;

            if(dup.contains(cur)) continue;
            if(cur > amount) continue;
            if(cur == amount) return ret;
            
            for(int c : coins) queue.add(cur + c);

            dup.add(cur);
        }

        return -1;
    }
}

class Solution {
    public int maxProduct(int[] nums) {
        int ret = nums[0];
        int max = ret;
        int min = ret;
        int temp;

        for(int i = 1; i < nums.length; i++){
            Integer[] candidates = {nums[i], min*nums[i], max*nums[i]};

            temp = Math.max(candidates[0], candidates[1]);
            max = Math.max(temp, candidates[2]);

            temp = Math.min(candidates[0], candidates[1]);
            min = Math.min(temp, candidates[2]);

            ret = Math.max(ret, max);
        }

        return ret;
    }
}

class Solution {
    int m;
    int n;
    public int dfs(int x, int y, HashMap<String, Integer> dup) {
        if(x >= m || y >= n) return 0;
        if(dup.containsKey(x+","+y)) return dup.get(x+","+y);
        if(x == m - 1 && y == n - 1) return 1;

        dup.put(x+","+y, dfs(x+1, y, dup) + 
                        dfs(x, y+1, dup) );

        return dup.get(x+","+y);
    }

    public int uniquePaths(int m, int n) {
        this.m = m;
        this.n = n;
        return dfs(0, 0, new HashMap<>());
    }
}
