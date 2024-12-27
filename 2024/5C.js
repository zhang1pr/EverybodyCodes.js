const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
class ListNode { constructor(t, e = null, l = null) { this.val = t, this.next = e, this.prev = l; } }
class DoublyLinkedList { constructor() { this.head = null, this.tail = null; } prepend(t) { let e = new ListNode(t, this.head, null); return this.tail ? (this.head.prev = e, this.head = e) : (this.tail = e, this.head = e), this; } append(t) { let e = new ListNode(t, null, this.tail); return this.head ? (this.tail.next = e, this.tail = e) : (this.head = e, this.tail = e), this; } deleteSameFromHead(t) { if (!this.head) return null; let e = null, l = this.head; for (; l;) { if (l.val === t) { if ((e = l) === this.head) this.head = e.next, this.head && (this.head.prev = null), e === this.tail && (this.tail = null); else if (e === this.tail) this.tail = e.prev, this.tail.next = null; else { let i = e.prev, h = e.next; i.next = h, h.prev = i; } } l = l.next; } return e; } deleteSameFromTail(t) { if (!this.tail) return null; let e = null, l = this.tail; for (; l;) { if (l.val === t) { if ((e = l) === this.tail) this.tail = e.prev, this.tail && (this.tail.next = null), e === this.head && (this.head = null); else if (e === this.head) this.head = e.next, this.head.prev = null; else { let i = e.prev, h = e.next; i.next = h, h.prev = i; } } l = l.prev; } return e.val; } findFromHead(t, e) { if (!this.head) return null; let l = this.head; for (; l;) { if (e && e(l) || l.val == t) return l; l = l.next; } return null; } findFromTail(t, e) { if (!this.tail) return null; let l = this.tail; for (; l;) { if (e && e(l) || l.val == t) return l; l = l.prev; } return null; } deleteHead() { if (!this.head) return null; let t = this.head; return this.head === this.tail ? (this.head = null, this.tail = null) : (this.head = this.head.next, this.head.prev = null), t.val; } deleteTail() { if (!this.tail) return null; let t = this.tail; return this.head === this.tail ? (this.head = null, this.tail = null) : (this.tail = this.tail.prev, this.tail.next = null), t.val; } reverse() { let t = this.head, e = null, l = null; for (; t;)l = t.next, e = t.prev, t.next = e, t.prev = l, e = t, t = l; return this.tail = this.head, this.head = e, this; } traverseFromHead() { let t = this.head; for (; t;)console.log(t.val), t = t.next; } traverseFromTail() { let t = this.tail; for (; t;)console.log(t.val), t = t.prev; } }
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), t = 1;
  let arr = readnum2d(input), R = arr.length, C = arr[0].length;

  let lists = [];
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) {
      if (lists[c] == null)
        lists[c] = new DoublyLinkedList();
      lists[c].append(arr[r][c]);
    }

  for (let c = 0; true; t++) {
    let cur = lists[c].head;
    let val = cur.val;

    lists[c].deleteHead();

    let f = c == C - 1;
    c = (c + 1) % C;

    let curR = f ? R - 1 : R;
    let div = Math.floor(val / curR), mod = val % curR;

    if (mod == 0)
      div--, mod = curR;

    let dummyHead = new ListNode(null, lists[c].head, null);
    lists[c].head.prev = dummyHead;
    let dummyTail = new ListNode(null, null, lists[c].tail);
    lists[c].tail.next = dummyTail;

    if (div % 2 == 0) {
      let node = dummyHead;

      for (let i = 0; i < mod; i++)
        node = node.next;

      let prev = node.prev;
      let insert = new ListNode(val, node, node.prev);

      node.prev = insert;
      prev.next = insert;

      lists[c].head = dummyHead.next;
      lists[c].tail = dummyTail.prev;
    } else {
      let node = dummyTail;

      for (let i = 0; i < mod; i++)
        node = node.prev;

      let next = node.next;
      let insert = new ListNode(val, node.next, node);

      node.next = insert;
      next.prev = insert;
    }

    lists[c].head = dummyHead.next;
    lists[c].tail = dummyTail.prev;

    let shout = lists.map(a => a.head.val).join('');
    let times = (map.get(shout) || 0) + 1;

    if (times == 2024) break;

    map.set(shout, times);
  }

  return [...map.keys()].sort((a, b) => b - a)[0];
}

console.log(solve(input));