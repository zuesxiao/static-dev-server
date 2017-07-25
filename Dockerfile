FROM node:6.11.1

WORKDIR /sds

# Make everything available for start
ADD . /sds

# Compile all projects
RUN apt-get update -qq && apt-get install -y apt-utils build-essential && npm install --production

# Set development environment as default
ENV NODE_ENV production

# Run default entry
CMD ["node" "index.js"]
