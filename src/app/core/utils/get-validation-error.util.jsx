

export const getValidationError = (errorCode) => {
  const codeMatcher = {
    ERR_NETWORK: "Se rompió la red",
  }

  return codeMatcher[errorCode]
}