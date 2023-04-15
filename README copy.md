## sql objects detector

Simple scan to detect all the common sql objects like tables & procedures. Useful for legacy discovery

![](./coverage/branches.svg) ![](./coverage/functions.svg) ![](./coverage/lines.svg) ![](./coverage/statements.svg)

```
export FOLDER_ABSOLUTE_LOCATION_TO_SCAN="/foo/bar/awful/legacy-web"
npm run scan
```

You will see a folder in which the static html is created: 

```
static dashboard : /foo/sql-tables-detector/.export/f35a6945-3d3e-444b-ae2c-e89b7a939cc9 
```

If you open it on a static server you should see something like this

![](https://user-images.githubusercontent.com/3322836/232174182-d1430dfc-ac1e-46de-959e-8c26c076d9cb.png)