
N = int(input("Enter the number of elements:"))

numbers = []
for _ in range(N):
    num =int(input("Enter a number:"))
    numbers.append(num)

even_numbers = [num for num in numbers if num % 2 == 0]
odd_numbers = [num for num in numbers if num % 2 != 0]

print("Original List:" , numbers)
print("Even Numbers:" , even_numbers)
print("Odd Numbers:" , odd_numbers)

