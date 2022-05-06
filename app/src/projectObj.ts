export function projectObj(source: object, project: object) {
  if (project === undefined) return source
  const keys = Object.keys(project)
  if (keys.length === 0) return source


  const whiteListKeys = []
  const blackListKeys = []
  for (const key of keys) {
    if (project[key]) whiteListKeys.push(key)
    else blackListKeys.push(key)
  }

  const whiteListeMode = whiteListKeys.length !== 0
  const projectFunc = whiteListeMode ? projectObjectWhiteList : projectObjectBlackList
  const relevantProjectionKeys = whiteListeMode ? whiteListKeys : blackListKeys

  return source instanceof Array ? source.map((ob) => projectFunc(ob, project, relevantProjectionKeys)) : projectFunc(source, project, relevantProjectionKeys)
}

function projectObjectWhiteList(source: object, project: object, whiteList: string[]) {
  const projection = {}
  for (const key of whiteList) {
    if (source[key] !== undefined) projection[key] = source[key] instanceof Object ? projectObj(source[key], project[key]) : source[key]
  }
  return projection
}
function projectObjectBlackList(source: object, project: object, blackList: string[]) {
  const projection = { ...source }
  for (const key of blackList) {
    if (source[key] !== undefined) delete projection[key]
  }
  for (const key in projection) {
    if (projection[key] instanceof Object) projection[key] = projectObj(source[key], project[key])
  }
  return projection
}

export default projectObj
