# git add .
# git commit -am "make it better"
# git branch -M main



# git remote add origin https://github.com/rorarola/flask-blog.git

# get current branch and push
current_branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# git pull
git pull origin "$current_branch"
echo "====pull changes from '$current_branch' branch"

# get the argument message
message="$1"

# If no commit message is passed, use current date time in the commit message
if [[ -z "${message// }" ]]
    then
        message=$(date '+%Y-%m-%d %H:%M:%S')
fi

# stage all changes
git add .
echo "====staged all git files"

# add commit
git commit -m "$message"
echo "====added the commit with message: '$message'"

# git push
git push origin "$current_branch"
echo "====pushed changes to '$current_branch' branch"


# git remote add origin https://github.com/rorarola/flask-blog.git
# git push -u origin main
git push heroku main
