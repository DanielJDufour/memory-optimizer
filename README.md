# memory-optimizer
> Reduce Memory Footprint of JavaScript Objects

## install
```sh
npm install memory-optimizer
```

## how does it work?
Makes all objects that are virtually identical (deeply equal) share the same reference.

## usage
```js
import { optimize } from "memory-optimizer";

const data = [
  { id: 1, contact: { email: "hello@example.com" } },
  { id: 2, contact: { email: "hello@example.com" } }
];

// contact objects looks the same but are technically different objects
data[0].contact === data[1].contact;
false

optimize(data);

// contact objects are now literally the same object, saving memory
data[0].contact === data[1].contact;
true
```