import { AbilityBuilder, createMongoAbility } from '@casl/ability';

export function defineAbilitiesFromSlugs(permissionSlugs = []) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  permissionSlugs.forEach(slug => {
    const parts = slug.split('-');
    const action = parts[0];
    const subject = parts.slice(1)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    can(action, subject);
  });

  return build();
}
