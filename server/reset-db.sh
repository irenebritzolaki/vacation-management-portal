# server/reset-db.sh
#!/bin/bash
cp seed.json db.json
echo "Database reset to initial state."