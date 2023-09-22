if [ "$#" -eq 0 ]; then
	echo "No arguments supplied"
else
	for arg_list in "$@"; do
		count=$((count+1))
		echo "$arg_list"
		if [ "$count" -ge 3 ]; then
			break
		fi
	done
fi
