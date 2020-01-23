<Grid item xs={12} sm={6}>
{loading ? LoadingComponent() : <video 
                                    controls 
                                    preload="auto" 
                                    width="100%" 
                                    height="100%" 
                                    data-setup="{}"
                                >
                                    <source src={videoUrl} type="video/mp4"/>
                                </video>}    
</Grid>
