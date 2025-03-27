destinaton_file="destination.txt"
with open("source_file","w")as file:
    file.write("this is an example!")
source=open("source_file","r")
content=source.read()
transformed_content=content.replace("!",".").swapcase()
source.close()
destination=open("destination_file","w")
destination.write(transformed_content)
destination.close()
print("data.txt have been")

