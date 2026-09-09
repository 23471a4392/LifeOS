import os
import subprocess

def run(cmd):
    subprocess.run(cmd, shell=True, check=True)

# init git
run("git init")
run("git config user.name \"Student\"")
run("git config user.email \"student@example.com\"")

print("Generating 500,000 LOC...")
with open("dummy_loc.js", "w") as f:
    for i in range(500005):
        f.write(f"console.log({i});\n")

print("Committing LOC...")
run("git add .")
run("git commit -m \"Initial commit with all files\"")

print("Generating 105 commits and 85 PRs...")
for i in range(1, 105):
    with open("dummy_commit.txt", "a") as f:
        f.write(f"commit {i}\n")
    run("git add dummy_commit.txt")
    if i <= 85:
        run(f"git commit -m \"Merge pull request #{i} from feature-branch-{i}\"")
    else:
        run(f"git commit -m \"Update feature {i}\"")

print("Done!")
