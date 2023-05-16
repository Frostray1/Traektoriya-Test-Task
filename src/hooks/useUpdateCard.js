export const updateNameCard = (objects, id, newName) => {
	const updatedObjects = objects.map(object => {
		if (object.id === id) {
			return { ...object, name: newName };
		}
		return object;
	});
	return updatedObjects;
};

export const updatePriceCard = (objects, id, newPrice) => {
	const updatedObjects = objects.map(object => {
		if (object.id === id) {
			return { ...object, price: newPrice };
		}
		return object;
	});
	return updatedObjects;
};
export const updateModelCard = (objects, id, newModel) => {
	const updatedObjects = objects.map(object => {
		if (object.id === id) {
			return { ...object, model: newModel };
		}
		return object;
	});
	return updatedObjects;
};
