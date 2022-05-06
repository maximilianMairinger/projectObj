import projectObj from "../../app/src/projectObj"
//const testElem = document.querySelector("#test")


const marc = {
  name: "Marc",
  age: 22,
  dob: new Date(1980, 1, 10).toLocaleDateString(),
}

const max = {
  name: "Max",
  age: 20,
  dob: new Date(1980, 1, 20).toLocaleDateString(),
  friend: marc
}

// @ts-ignore
marc.friend = max


const project = {
  dob: false,
  friend: {}
}

console.log(projectObj(max, project))
