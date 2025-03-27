import bcrypt

def hash(password):
    # Convert password to bytes and hash it
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    return hash.decode('utf-8')  # Convert bytes back to string for storage

# using this to 
if __name__ == "__main__":
    while True:
        password = input("Enter password to hash (or 'q' to quit): ")
        if password.lower() == 'q':
            break
        hashed = hash(password)
        print(f"\nHashed password: {hashed}\n")