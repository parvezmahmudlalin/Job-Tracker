1.What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: 

a. getElementById()
Returns a single element based on a specific id.

b. getElementsByClassName()
Returns multiple elements that share the same class name (as an HTMLCollection).

c. querySelector()
Returns the first element that matches a CSS selector.

d. querySelectorAll()
Returns all elements that match a CSS selector (as a NodeList).

2.How do you create and insert a new element into the DOM?

Ans: To create and insert a new element:

a. Use document.createElement() to create the element
b. Add content using innerText or innerHTML
c. Insert it into the DOM using append() or appendChild()

3.What is Event Bubbling? And how does it work?

Ans: Event Bubbling is a process where an event starts from the target element and then propagates upward through its parent elements in the DOM.

4.What is Event Delegation in JavaScript? Why is it useful?

Ans: Event Delegation is a technique where you attach an event listener to a parent element to handle events for its child elements.

It is useful because:

a. It reduces the number of event listeners
b. Improves performance
c. Works for dynamically added elements

5.What is the difference between preventDefault() and stopPropagation() methods?
Ans: 

a. preventDefault()
Stops the browser’s default behavior (e.g., preventing form submission or link navigation).

b. stopPropagation()
Stops the event from bubbling up to parent elements.