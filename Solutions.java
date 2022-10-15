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
