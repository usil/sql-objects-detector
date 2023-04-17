# sql objects detector

Simple scan to detect all the common sql objects like tables & procedures. Useful for legacy discovery

![](./coverage/branches.svg) ![](./coverage/functions.svg) ![](./coverage/lines.svg) ![](./coverage/statements.svg)


# Generate dashboard

```
export folder_absolute_location_to_scan="/foo/bar/awful/legacy-web"
export dashboard_type=d3js
export json_mode=attached
npm run scan
```

You will see a folder in which the static html is created: 

```
static dashboard : /foo/sql-tables-detector/.export/f35a6945-3d3e-444b-ae2c-e89b7a939cc9 
```

![image](https://user-images.githubusercontent.com/3322836/232637813-8afdd2da-bddc-47ba-82fb-40a82509e50c.png)

If you open it directly on your browser, you should see something like this

**d3js dashboard**

<img src="https://user-images.githubusercontent.com/3322836/232638262-71e7e7c8-e47c-4547-999f-6e0984ebec8b.png" width=300>

# Dashbord and report types

**dashboard_type=viz-network**

<img src="https://user-images.githubusercontent.com/3322836/232638333-35ee8e20-2741-45f3-8f0f-5d4597c62c0d.png" width=300>

**dashboard_type=xlsx**

A simple excel

# Roadmap

- select foo from bar join aaaa .. join bbbb