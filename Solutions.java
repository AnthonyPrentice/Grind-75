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
