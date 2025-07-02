#!/bin/bash
# Fix all directory imports to explicit file imports

find src/ -name "*.js" -o -name "*.jsx" | xargs sed -i "s|from '../constants'|from '../constants/index.js'|g"
find src/ -name "*.js" -o -name "*.jsx" | xargs sed -i "s|from '../utils/helpers'|from '../utils/helpers.js'|g"
find src/ -name "*.js" -o -name "*.jsx" | xargs sed -i "s|from '../services/performanceService'|from '../services/performanceService.js'|g"
find src/ -name "*.js" -o -name "*.jsx" | xargs sed -i "s|from './supabaseClient'|from './supabaseClient.js'|g"

echo "✅ Fixed all directory imports"
