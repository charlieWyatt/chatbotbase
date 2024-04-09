#!/bin/bash

# Set color for warning
RED='\033[0;31m'
NC='\033[0m' # No Color

# Warning message
echo -e "${RED}DANGER: THIS WILL DELETE ALL RECORDS IN YOUR DATABASE. Only proceed if you are sure of the ramifications.${NC}"
echo "Type 'DELETE' to proceed: "

# Read user input
read input

# Check if input matches 'DELETE'
if [[ "$input" == "DELETE" ]]; then
    echo "Resetting database..."
    yarn prisma migrate reset --force
    yarn prisma:generate
    yarn prisma:seed
    echo "Database reset complete."
else
    echo "Database reset aborted."
fi