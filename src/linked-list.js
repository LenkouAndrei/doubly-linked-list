const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._tail = null;
        this._head = null;
    }

    append(data) {
        var node = new Node(data);

        if(this.length){
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        else{
            this._head = node;
            this._tail = node;
        }
        this.length++;

        return this;
    }

    head() {
       return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        var findEl = this._head;

        if(index != 0){
            while(index){
                findEl = findEl.next;
                index--;
            }
        }//end if

        return findEl.data;
    }

    insertAt(index, data) {
        if(index == 0 && this.length == 0){
            this.append(data);
            return this;
        }else{
            var insertEl = this._tail,
                copy,
                newNode,
                i;

            newNode = new Node(this._tail.data, this._tail, null);
            this._tail.next = newNode;
            this._tail = newNode;
            this.length++;

                for(i = this.length - 1; i > index + 1; i--){
                   insertEl.data = insertEl.prev.data;
                   insertEl = insertEl.prev;
                };

            insertEl.data = data;
            return this;
        }

    }

    isEmpty() {
     return !this.length;
    }

    clear() {
     var deletedNode,
         deletedNext;

    if(this.length != 0){
        while(this.length != 1){
            deletedNode = this._head;
            deletedNext = this._head.next;
            this._head = deletedNext;
            deletedNext.prev = null;
            this.length--;
        }

        this._head.data = null;
        this._tail.data = null;
        this.length = 0;
        return this;
    }else{
        return this;
    }
    }

    deleteAt(index) {
     var deletedNode,
         deletedPrev,
         deletedNext,
         i=1;

     if(index === 0){
         deletedNode = this._head;
         deletedNext = this._head.next;
         this._head = deletedNext;
         if(deletedNext){
            deletedNext.prev = null;
         }else{
            this._tail = null;
         }
         this.length--;
     };

     if(index === (this.length - 1)){  
         deletedNode = this._tail;
         deletedPrev = this._tail.prev;
         this._tail = deletedPrev;
             deletedPrev.next = null;
         this.length--;
     };

     if((0 < index) && (index < this.length)){
         deletedNode = this._head;

         while(i <= index){
        deletedNode=deletedNode.next;
        i++;
         };

        deletedNext = deletedNode.next;
        deletedPrev = deletedNode.prev;
        deletedPrev.next = deletedNext;
        deletedNext.prev = deletedPrev;
        deletedNode = null;
        this.length--;
     };

     return this;
    }

    reverse() {
     var changeFirst = this._head,
         changeLast = this._tail,
         varia,
         i;

     i = Math.floor(this.length/2);

     while(i){
        varia = changeFirst.data;
        changeFirst.data = changeLast.data;
        changeLast.data = varia;
        changeFirst = changeFirst.next;
        changeLast = changeLast.prev;
        i--;
     }

     return this;
    }

    indexOf(data) {
     var i = 0,
         number = -1,
         currentNode = this._head;
     
     while(i < this.length){
        if(currentNode.data == data){
            number = i;
            break;
        }else{
            currentNode = currentNode.next;
            i++;
        }
     }//окончане while

     return number;
    }
}

module.exports = LinkedList;
