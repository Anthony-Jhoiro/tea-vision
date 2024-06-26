const dateFormat = require('dateformat');
const { readFileSync } = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, '.github', 'templates');

// Given a `const` variable `TEMPLATE_DIR` which points to "<semantic-release-gitmoji>/lib/assets/templates"

// the *.hbs template and partials should be passed as strings of contents
const template = readFileSync(path.join(TEMPLATE_DIR, 'release-note.hbs'));

module.exports = {
  branches: ['main'],
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        releaseRules: {
          major: [':boom:'],
          minor: [':sparkles:', ':tada:'],
          patch: [
            ':bug:',
            ':ambulance:',
            ':lock:',
            ':lipstick:',
            ':zap:',
            ':globe_with_meridians:',
            ':alien:',
            ':wheelchair:',
            ':loud_sound:',
            ':mute:',
            ':children_crossing:',
            ':speech_balloon:',
            ':iphone:',
            ':pencil2:',
            ':bento:',
            ':green_apple:',
            ':green_heart:',
          ],
        },
        releaseNotes: {
          template,
          helpers: {
            datetime: function (format = 'UTC:yyyy-mm-dd') {
              return dateFormat(new Date(), format);
            },
          },
        },
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'nx run-many -t set-version --args="--version=${nextRelease.version}"',
        publishCmd:
          'nx run-many -t release --args="--version=${nextRelease.version}"',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'package.json',
          'README.md',
          '**/pom.xml',
          '!node_modules/**',
          '!dist/**',
          '!.nx/**',
        ],
        message:
          ':bookmark: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
