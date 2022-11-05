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
