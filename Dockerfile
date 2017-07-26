FROM node:8.1.4

WORKDIR /sds

# Make everything available for start
ADD . /sds

# Compile all projects
# RUN apt-get update -qq && apt-get install -y apt-utils build-essential && npm install --production
RUN npm install --production

# Run default entry
CMD ["npm", "start"]

EXPOSE 3000
