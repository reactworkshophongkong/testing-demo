const sum = (a,b) => a+b
const letterCount = word => word.split('').reduce((acc, current) => {
  if(!acc[current]) {
    acc[current] = 0
  }
  acc[current] = acc[current] + 1
  return acc
}, { })

describe('A description for grouping our tests', () => {
  describe('They can be nested', () => {
    test('sum function returns the correct value', () => {
      //Arrange

      //Act
      const result = sum(1,2)

      //Assert
      expect(result).toBe(3)
      expect(result).not.toBe(5)
    })

    test('letterCount should return an object with the count of each character', () => {
      // Arrange
      const test = 'apple'

      // Act
      const result = letterCount(test)

      expect(result).toEqual({
        a: 1,
        e: 1,
        p: 2,
        l: 1,
      })

    })
  })
})