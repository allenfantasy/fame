module.exports = {
  dev: {
    files: {
      '.tmp/index.html': ['<%= config.base %>/index.html']
    }
  },
  dist: {
    files: {
      '<%= config.dist %>/index.html': ['<%= config.base %>/index.html']
    }
  },
  options: {
    commentMarker: 'process'
  }
};
