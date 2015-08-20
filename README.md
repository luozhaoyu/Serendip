Serendip
==========

Save the biggest visible picture in your chrome.

Press 'S', then choose the folder to save your picture!

Use chrome to pack this extension.

TODO:

can not catch onkeypress @weibo.com's some bigger picture model

### Snippet
`find ~/Downloads/ -maxdepth 1 -type f |grep -P "/.{10}T.{11}$" | xargs mv -v -t ~/Pictures/serendip`
