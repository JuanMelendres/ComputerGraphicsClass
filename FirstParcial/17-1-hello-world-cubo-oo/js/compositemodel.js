class CompositeModel extends Model
{
	constructor()
	{
		super();
		this.childList = [];
	}

	addChild(model)
	{
		this.childList.push(model);
	}


	render(viewProjMatrix)
	{
		for(var i = 0; i < this.childList.length; i++)
		{
			this.childList[i].render(viewProjMatrix);
		}
	}
}

